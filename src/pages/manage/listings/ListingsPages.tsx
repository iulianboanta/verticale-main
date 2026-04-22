import ListingsTable from "@/components/manage/ListingsTable";

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-semibold">{title}</h1>
    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

export const AllListings = () => (
  <div>
    <PageHeader title="Listings Management" subtitle="Toate companiile listate pe platformă" />
    <ListingsTable />
  </div>
);
