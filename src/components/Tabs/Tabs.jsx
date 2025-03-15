import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs-header">
            <button
                className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
            >
                Todos
            </button>
            <button
                className={`tab-button ${activeTab === "figures" ? "active" : ""}`}
                onClick={() => setActiveTab("figures")}
            >
                Figuras
            </button>
            <button
                className={`tab-button ${activeTab === "clothing" ? "active" : ""}`}
                onClick={() => setActiveTab("clothing")}
            >
                Ropa
            </button>
            <button
                className={`tab-button ${activeTab === "accessories" ? "active" : ""}`}
                onClick={() => setActiveTab("accessories")}
            >
                Accesorios
            </button>
            <button
                className={`tab-button ${activeTab === "collectibles" ? "active" : ""}`}
                onClick={() => setActiveTab("collectibles")}
            >
                Coleccionables
            </button>
        </div>
    );
};

export default Tabs;
