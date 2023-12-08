const getAdminPermission = () => {
  const adminPermissionStr = localStorage.getItem("adminPermission");
  const adminPermission = adminPermissionStr
    ? JSON.parse(adminPermissionStr)
    : [];
  return {
    addAdmin: adminPermission.includes("addEvent"),
    deletePicture: adminPermission.includes("deletePicture"),
    deleteAdmin: adminPermission.includes("deleteAdmin"),
    addEvent: adminPermission.includes("addEvent"),
    addDepartment: adminPermission.includes("addDepartment"),
    deleteHomeSlide: adminPermission.includes("deleteHomeSlide"),
    deleteType: adminPermission.includes("deleteType"),
    addHomeSlide: adminPermission.includes("addHomeSlide"),
    getFeedbackEvents: adminPermission.includes("getFeedbackEvents"),
    deleteDepartment: adminPermission.includes("deleteDepartment"),
    putDepartment: adminPermission.includes("putDepartment"),
    addLocation: adminPermission.includes("addLocation"),
    addPicture: adminPermission.includes("addPicture"),
    patchHomeSlide: adminPermission.includes("patchHomeSlide"),
    updateLocationName: adminPermission.includes("updateLocationName"),
    putAdmin: adminPermission.includes("putAdmin"),
    addType: adminPermission.includes("addType"),
    deleteLocation: adminPermission.includes("deleteLocation"),
    updateType: adminPermission.includes("updateType"),
  };
};

export default getAdminPermission;
