import { Button } from "components/button";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";

const CATEGORY_PER_PAGE = 10;

const CategoryManage = () => {
  const handleInputFilter = () => {};
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
