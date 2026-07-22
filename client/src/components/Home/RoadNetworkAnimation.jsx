import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Navigation, Sparkles, ShieldCheck, Zap } from "lucide-react";

const RoadNetworkAnimation = () => {
	const canvasRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let animationFrameId;

		const handleResize = () => {
			canvas.width = canvas.parentElement.clientWidth;
			canvas.height = 420;
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		// City Nodes on the map
		const cities = [
			{ x: 0.12, y: 0.25, name: "Jaipur", color: "#3B82F6" },
			{ x: 0.35, y: 0.70, name: "Mumbai", color: "#10B981" },
			{ x: 0.60, y: 0.30, name: "Delhi NCR", color: "#F59E0B" },
			{ x: 0.82, y: 0.65, name: "Bangalore", color: "#8B5CF6" },
			{ x: 0.95, y: 0.25, name: "Udaipur", color: "#EC4899" },
		];

		// Road Connections between cities
		const roads = [
			{ from: 0, to: 1, color: "#2563EB", lanes: 2 },
			{ from: 0, to: 2, color: "#3B82F6", lanes: 2 },
			{ from: 2, to: 3, color: "#10B981", lanes: 2 },
			{ from: 1, to: 3, color: "#8B5CF6", lanes: 2 },
			{ from: 2, to: 4, color: "#EC4899", lanes: 2 },
		];

		// Cars driving on the roads
		const cars = Array.from({ length: 14 }).map((_, i) => {
			const roadIndex = i % roads.length;
			return {
				roadIndex,
				progress: Math.random(),
				speed: 0.0015 + Math.random() * 0.002,
				color: i % 3 === 0 ? "#60A5FA" : i % 3 === 1 ? "#34D399" : "#FBBF24",
				size: 6 + Math.random() * 3,
				direction: Math.random() > 0.3 ? 1 : -1,
			};
		});

		let pulse = 0;

		const render = () => {
			pulse += 0.03;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw Dark Highway Background
			ctx.fillStyle = "#0B0F19";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Grid pattern lines
			ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
			ctx.lineWidth = 1;
			const gridSize = 40;
			for (let x = 0; x < canvas.width; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, canvas.height);
				ctx.stroke();
			}
			for (let y = 0; y < canvas.height; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}

			// Draw Roads / Highways
			roads.forEach((road) => {
				const start = cities[road.from];
				const end = cities[road.to];
				const sx = start.x * canvas.width;
				const sy = start.y * canvas.height;
				const ex = end.x * canvas.width;
				const ey = end.y * canvas.height;

				// Draw Road Glow Outer Line
				ctx.beginPath();
				ctx.moveTo(sx, sy);
				ctx.lineTo(ex, ey);
				ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
				ctx.lineWidth = 12;
				ctx.stroke();

				// Draw Main Road Track
				ctx.beginPath();
				ctx.moveTo(sx, sy);
				ctx.lineTo(ex, ey);
				ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
				ctx.lineWidth = 4;
				ctx.stroke();

				// Dashed Center Divider
				ctx.beginPath();
				ctx.setLineDash([8, 8]);
				ctx.lineDashOffset = -pulse * 15;
				ctx.moveTo(sx, sy);
				ctx.lineTo(ex, ey);
				ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
				ctx.lineWidth = 1.5;
				ctx.stroke();
				ctx.setLineDash([]);
			});

			// Update & Draw Moving Cars
			cars.forEach((car) => {
				car.progress += car.speed * car.direction;
				if (car.progress > 1) car.progress = 0;
				if (car.progress < 0) car.progress = 1;

				const road = roads[car.roadIndex];
				const start = cities[road.from];
				const end = cities[road.to];

				const sx = start.x * canvas.width;
				const sy = start.y * canvas.height;
				const ex = end.x * canvas.width;
				const ey = end.y * canvas.height;

				const currentX = sx + (ex - sx) * car.progress;
				const currentY = sy + (ey - sy) * car.progress;

				// Calculate Angle for Car Headlight Beam
				const angle = Math.atan2(ey - sy, ex - sx) + (car.direction === -1 ? Math.PI : 0);

				// Headlight Cone Glow
				ctx.save();
				ctx.translate(currentX, currentY);
				ctx.rotate(angle);

				const glowGradient = ctx.createRadialGradient(8, 0, 1, 24, 0, 18);
				glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
				glowGradient.addColorStop(0.5, "rgba(96, 165, 250, 0.5)");
				glowGradient.addColorStop(1, "rgba(96, 165, 250, 0)");

				ctx.beginPath();
				ctx.moveTo(4, -3);
				ctx.lineTo(28, -12);
				ctx.lineTo(28, 12);
				ctx.lineTo(4, 3);
				ctx.fillStyle = glowGradient;
				ctx.fill();

				// Car Body Capsule
				ctx.fillStyle = car.color;
				ctx.shadowColor = car.color;
				ctx.shadowBlur = 12;
				ctx.beginPath();
				ctx.roundRect(-8, -4, 16, 8, 4);
				ctx.fill();
				ctx.shadowBlur = 0;

				// Rear Red Taillight Glow
				ctx.fillStyle = "#EF4444";
				ctx.beginPath();
				ctx.arc(-8, -2, 1.5, 0, Math.PI * 2);
				ctx.arc(-8, 2, 1.5, 0, Math.PI * 2);
				ctx.fill();

				ctx.restore();
			});

			// Draw City Hub Nodes
			cities.forEach((city) => {
				const cx = city.x * canvas.width;
				const cy = city.y * canvas.height;

				// Glowing Outer Circle Pulse
				const pulseRadius = 14 + Math.sin(pulse * 2) * 4;
				ctx.beginPath();
				ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(37, 99, 235, 0.15)";
				ctx.fill();

				// Node Point
				ctx.beginPath();
				ctx.arc(cx, cy, 6, 0, Math.PI * 2);
				ctx.fillStyle = city.color;
				ctx.shadowColor = city.color;
				ctx.shadowBlur = 15;
				ctx.fill();
				ctx.shadowBlur = 0;

				// City Label Tag
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "bold 12px Outfit, sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(city.name, cx, cy - 14);
			});

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<section className="relative w-full bg-[#0B0F19] text-white py-16 overflow-hidden border-y border-slate-800">
			{/* Background Canvas */}
			<div className="w-full relative h-[420px]">
				<canvas ref={canvasRef} className="w-full h-full block" />

				{/* Center Floating Glass Overlay Card */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="pointer-events-auto max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl text-center flex flex-col items-center gap-4">
						
						<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
							<Zap size={14} className="animate-pulse text-blue-400" />
							<span>Live Fleet Highway Network</span>
						</div>

						<h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
							100+ Luxury Cars En Route Across 25+ Cities
						</h2>

						<p className="text-xs sm:text-sm text-gray-400 font-medium max-w-md">
							Real-time GPS dispatching, instant keyless pickup, and 24/7 highway concierge protection.
						</p>

						<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
							<button
								onClick={() => {
									navigate("/cars");
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dull text-white font-bold text-sm transition-all shadow-lg hover:shadow-primary/30 active:scale-98 cursor-pointer flex items-center gap-2">
								<Navigation size={16} />
								<span>Explore Live Cars</span>
							</button>

							<div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
								<ShieldCheck size={16} />
								<span>100% Verified Drivers</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default RoadNetworkAnimation;
