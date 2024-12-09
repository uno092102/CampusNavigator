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

  // Fetch all services
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campusservice")
      .then((response) => setServices(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle input changes for the add/update form
  const handleChange = (e, field) => {
    const value = e.target.value;
    if (editService) {
      setEditService((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewService((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Add a new service
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

  // Delete a service
  const handleDeleteService = (serviceID) => {
    if (!serviceID || typeof serviceID !== "number") {
      console.error("Invalid service ID:", serviceID);
      return;
    }

    axios
      .delete(`http://localhost:8080/api/campusservice/${serviceID}`)
      .then(() => {
        // Update the services list after deletion
        setServices((prev) => prev.filter((service) => service.serviceID !== serviceID));
        console.log(`Service with ID ${serviceID} deleted successfully.`);
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  // Update a service
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
        setEditService(null); // Reset the form
        console.log("Service updated successfully:", response.data);
      })
      .catch((error) => console.error("Error updating service:", error));
  };

  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header
        style={{
          backgroundColor: "#4C52FF",
          color: "#FFFFFF",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h1>Campus Services</h1>
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#FFFFFF",
            color: "#4C52FF",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => setDeveloperMode(!developerMode)}
        >
          {developerMode ? "Disable Developer Mode" : "Enable Developer Mode"}
        </button>
      </header>

      <main style={{ marginTop: "20px" }}>
        {/* List of Services */}
        <div>
          {services.map((service) => (
            <div
              key={service.serviceid}
              style={{
                backgroundColor: "#F9F9F9",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: 0 }}>{service.name}</h3>
              <p style={{ margin: "5px 0" }}>{service.description}</p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                Location: {service.locationType}, Managed by: {service.managedBy}
              </p>
              {developerMode && (
                <div>
               <button
                style={{
                  backgroundColor: "#FF4C4C",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteService(service.serviceID)}
              >
                Delete
              </button>
                  <button
                    style={{
                      backgroundColor: "#4C9AFF",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => setEditService(service)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add or Edit Form */}
        {developerMode && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              marginTop: "20px",
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
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
  />
  <textarea
    placeholder="Description"
    value={editService ? editService.description : newService.description}
    onChange={(e) => handleChange(e, "description")}
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
  />
  <input
    type="text"
    placeholder="Contact Info"
    value={editService ? editService.contactInfo : newService.contactInfo}
    onChange={(e) => handleChange(e, "contactInfo")}
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
  />
  <input
    type="text"
    placeholder="Location Type"
    value={editService ? editService.locationType : newService.locationType}
    onChange={(e) => handleChange(e, "locationType")}
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
  />
  <input
    type="text"
    placeholder="Operating Hours"
    value={
      editService ? editService.operatingHours : newService.operatingHours
    }
    onChange={(e) => handleChange(e, "operatingHours")}
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
  />
  <input
    type="text"
    placeholder="Service Type"
    value={editService ? editService.serviceType : newService.serviceType}
    onChange={(e) => handleChange(e, "serviceType")}
    style={{ width: "100%", margin: "5px 0", padding: "8px" }}
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
    }}
    onClick={editService ? handleUpdateService : handleAddService}
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
