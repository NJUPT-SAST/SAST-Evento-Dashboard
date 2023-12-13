import { Select } from "@douyinfe/semi-ui";
import styles from "./DepartmentSelect.module.scss";
import React, { useEffect, useState } from "react";
import { getDepartments } from "@/apis/departments";

interface DepartmentSelectionProps {
  setChosenDepartment: (department: string) => void;
}

export const DepartmentSelection: React.FC<DepartmentSelectionProps> = ({
  setChosenDepartment,
}) => {
  const [departments, setDepartments] = useState<
    Array<{ id: number; departmentName: string }>
  >([]);

  useEffect(() => {
    getDepartments().then((res) => {
      console.log(res.data);
      setDepartments(res.data);
    });
  }, []);

  return (
    <>
      <Select
        defaultValue="全部"
        className={styles.select}
        onChange={(value: any) => setChosenDepartment(value)}
        multiple={true}
      >
        {departments?.map((obj, index) => {
          return (
            <Select.Option value={obj.id} key={index}>
              {obj.departmentName}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
