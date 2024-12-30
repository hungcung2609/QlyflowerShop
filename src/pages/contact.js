import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/pages/Contact.css";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: "/assets/3006698.png", // Đảm bảo URL đúng
    iconSize: [32, 32], // Kích thước của biểu tượng
    iconAnchor: [16, 32], // Vị trí mũi tên của biểu tượng
    popupAnchor: [0, -32], // Vị trí cửa sổ popup
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
});

const Contact = () => {
    const [stores, setStores] = useState([]); // Dữ liệu cửa hàng từ API
    const [search, setSearch] = useState("");
    const [selectedStore, setSelectedStore] = useState(null);

    // Fetch stores data from API
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch("http://localhost:8081/identity/locate");
                const data = await response.json();
                setStores(data); // Lưu dữ liệu vào state
                if (data.length > 0) {
                    setSelectedStore(data[0]); // Chọn cửa hàng đầu tiên làm mặc định
                }
            } catch (error) {
                console.error("Error fetching store locations:", error);
            }
        };

        fetchStores();
    }, []);

    // Map search function
    const MapSearch = ({ position }) => {
        const map = useMap();
        map.setView(position, 15); // Di chuyển bản đồ tới vị trí được chọn
        return null;
    };

    // Handle search
    const handleSearch = () => {
        const store = stores.find((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
        );
        if (store) {
            setSelectedStore(store);
        } else {
            alert("Không tìm thấy cửa hàng!");
        }
    };

    return (
        <div className="store-locator">
            {/* Search Input */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm cửa hàng..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            {/* Map */}
            {selectedStore && (
                <MapContainer
                    center={[selectedStore.latitude, selectedStore.longitude]}
                    zoom={15}
                    style={{ height: "500px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {stores.map((store) => (
                        <Marker
                            key={store.id}
                            position={[store.latitude, store.longitude]}
                            icon={customIcon} // Đặt biểu tượng cho marker
                        >
                            <Popup>{store.name}</Popup>
                        </Marker>
                    ))}
                    <MapSearch position={[selectedStore.latitude, selectedStore.longitude]} />
                </MapContainer>
            )}
        </div>
    );
};

export default Contact;
