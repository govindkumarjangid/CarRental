const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="relative md:w-18 md:h-18 w-12 h-12">
                <div className="orbit-dot bg-primary opacity-10"  style={{ animationDelay: '-0s' }}></div>
                <div className="orbit-dot bg-primary opacity-25"  style={{ animationDelay: '-0.15s' }}></div>
                <div className="orbit-dot bg-primary opacity-40"  style={{ animationDelay: '-0.30s' }}></div>
                <div className="orbit-dot bg-primary opacity-60"  style={{ animationDelay: '-0.45s' }}></div>
                <div className="orbit-dot bg-primary opacity-80"  style={{ animationDelay: '-0.60s' }}></div>
                <div className="orbit-dot bg-primary opacity-100" style={{ animationDelay: '-0.75s' }}></div>
            </div>
        </div>
    );
};

export default Loader;
