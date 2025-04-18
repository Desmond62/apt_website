import Dashboard from "../components/dashboard/dashboard";
import type { Route } from "./+types/home";

// import TableComponent from "~/components/tableComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      {/* <h1 className="bg-amber-600">Hello world</h1> */}
      <Dashboard />   
    </>
  );
}

{
  /* <TableComponent
        titles={["Name", "Email", "Phone", "Address", "Action"]}
        data={[
          {
            name: "John Doe",
            email: "john@doe.com",
            phone: "1234567890",
            address: "123 Main St",
            action: "Edit",
          },

          {
            name: "John Doe",
            email: "john@doe.com",
            phone: "1234567890",
            address: "123 Main St",
            action: "Edit",
          },
        ]}
        type="card"
      />

      <TableComponent
        titles={["Name", "Email", "Phone"]}
        data={[
          { name: "John Doe", email: "john@doe.com", phone: "1234567890" },
          { name: "John Doe", email: "john@doe.com", phone: "1234567890" },
          { name: "John Doe", email: "john@doe.com", phone: "1234567890" },
        ]}
        type="user"
      /> */
}
