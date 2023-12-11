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

export interface Permissions {
  addAdmin: any;
  deletePicture: any;
  deleteAdmin: boolean;
  addEvent: boolean;
  addDepartment: boolean;
  deleteHomeSlide: boolean;
  deleteType: boolean;
  addHomeSlide: boolean;
  getFeedbackEvents: boolean;
  deleteDepartment: boolean;
  putDepartment: boolean;
  addLocation: boolean;
  addPicture: boolean;
  patchHomeSlide: boolean;
  updateLocationName: boolean;
  putAdmin: boolean;
  addType: boolean;
  deleteLocation: boolean;
  updateType: boolean;
}

export default getAdminPermission;
