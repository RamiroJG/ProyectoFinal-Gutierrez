import "./Tabs.css"
import { useNavigate } from 'react-router-dom'

const Tabs = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate()

    const handleTabClick = (tabValue) => {
        setActiveTab(tabValue)

        if (tabValue === "all") {
            navigate("/")
        } else {
            navigate(`/categoria/${tabValue}`)
        }
    }

    return (
        <div className="tabs-header">
            <button
                className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                onClick={() => handleTabClick("all")}
            >
                Todos
            </button>

            <button
                className={`tab-button ${activeTab === "figures" ? "active" : ""}`}
                onClick={() => handleTabClick("figures")}
            >
                Figuras
            </button>

            <button
                className={`tab-button ${activeTab === "clothing" ? "active" : ""}`}
                onClick={() => handleTabClick("clothing")}
            >
                Ropa
            </button>

            <button
                className={`tab-button ${activeTab === "accessories" ? "active" : ""}`}
                onClick={() => handleTabClick("accessories")}
            >
                Accesorios
            </button>

            <button
                className={`tab-button ${activeTab === "collectibles" ? "active" : ""}`}
                onClick={() => handleTabClick("collectibles")}
            >
                Coleccionables
            </button>
        </div>
    )
}

export default Tabs
