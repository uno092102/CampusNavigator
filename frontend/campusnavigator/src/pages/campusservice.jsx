import React, { useState, useEffect } from "react";
import axios from "axios";

const CampusServicePage = () => {
  const [services, setServices] = useState([]);
  const [developerMode, setDeveloperMode] = useState(false);
  const [newService, setNewService] = useState({
    contactInfo: "",
    description: "",
    locationID: "",
    locationType: "",
    managedBy: "",
    name: "",
    operatingHours: "",
    serviceType: "",
  });
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campusservice")
      .then((response) => setServices(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (editService) {
      setEditService((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewService((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddService = () => {
    axios
      .post("http://localhost:8080/api/campusservice", newService)
      .then((response) => {
        setServices((prev) => [...prev, response.data]);
        setNewService({
          contactInfo: "",
          description: "",
          locationID: "",
          locationType: "",
          managedBy: "",
          name: "",
          operatingHours: "",
          serviceType: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteService = (serviceID) => {
    if (!serviceID || typeof serviceID !== "number") {
      console.error("Invalid service ID:", serviceID);
      return;
    }

    axios
      .delete(`http://localhost:8080/api/campusservice/${serviceID}`)
      .then(() => {
        setServices((prev) =>
          prev.filter((service) => service.serviceID !== serviceID)
        );
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  const handleUpdateService = () => {
    if (!editService || !editService.serviceID) {
      console.error("Invalid service to update:", editService);
      return;
    }

    axios
      .put(`http://localhost:8080/api/campusservice/${editService.serviceID}`, editService)
      .then((response) => {
        setServices((prev) =>
          prev.map((service) =>
            service.serviceID === editService.serviceID ? response.data : service
          )
        );
        setEditService(null);
      })
      .catch((error) => console.error("Error updating service:", error));
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        background: "linear-gradient(135deg, #7463FF, #D7AFFF)",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          backgroundColor: "#ffffff",
          color: "#4C52FF",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1 style={{ margin: 0 }}>Campus Services</h1>
        <button
          style={{
            marginTop: "15px",
            backgroundColor: "#4C52FF",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => setDeveloperMode(!developerMode)}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#6C74FF")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4C52FF")}
        >
          {developerMode ? "Disable Developer Mode" : "Enable Developer Mode"}
        </button>
      </header>

      <main style={{ marginTop: "30px" }}>
        <div>
          {services.map((service) => (
            <div
              key={service.serviceid}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ margin: 0, color: "#4C52FF" }}>{service.name}</h3>
              <p style={{ margin: "10px 0", color: "#555" }}>
                {service.description}
              </p>
              <p style={{ margin: "5px 0", color: "#777" }}>
                Location: {service.locationType}, Managed by: {service.managedBy}
              </p>
              {developerMode && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    style={{
                      backgroundColor: "#FF4C4C",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 15px",
                      marginRight: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => handleDeleteService(service.serviceID)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#FF7373")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#FF4C4C")
                    }
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      backgroundColor: "#4C9AFF",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 15px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => setEditService(service)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#73B1FF")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#4C9AFF")
                    }
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {developerMode && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              marginTop: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{editService ? "Edit Service" : "Add New Service"}</h3>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={editService ? editService.name : newService.name}
                onChange={(e) => handleChange(e, "name")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <textarea
                placeholder="Description"
                value={
                  editService ? editService.description : newService.description
                }
                onChange={(e) => handleChange(e, "description")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Contact Info"
                value={editService ? editService.contactInfo : newService.contactInfo}
                onChange={(e) => handleChange(e, "contactInfo")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Location Type"
                value={
                  editService ? editService.locationType : newService.locationType
                }
                onChange={(e) => handleChange(e, "locationType")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Operating Hours"
                value={
                  editService
                    ? editService.operatingHours
                    : newService.operatingHours
                }
                onChange={(e) => handleChange(e, "operatingHours")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <input
                type="text"
                placeholder="Service Type"
                value={
                  editService ? editService.serviceType : newService.serviceType
                }
                onChange={(e) => handleChange(e, "serviceType")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #CCC",
                }}
              />
              <button
                style={{
                  backgroundColor: "#4C9AFF",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  marginTop: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onClick={editService ? handleUpdateService : handleAddService}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#74B3FF")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#4C9AFF")
                }
              >
                {editService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampusServicePage;
