import ListingsTable from "@/components/manage/ListingsTable";

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-semibold">{title}</h1>
    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

export const AllListings = () => (
  <div><PageHeader title="Toate listingurile" subtitle="Toate companiile listate pe platformă" /><ListingsTable /></div>
);
export const PendingListings = () => (
  <div><PageHeader title="Listinguri în așteptare aprobare" /><ListingsTable initialStatus="pending" hideStatusFilter /></div>
);
export const ActiveListings = () => (
  <div><PageHeader title="Listinguri active" /><ListingsTable initialStatus="active" hideStatusFilter /></div>
);
export const ExpiredListings = () => (
  <div><PageHeader title="Listinguri expirate" /><ListingsTable initialStatus="expired" hideStatusFilter /></div>
);
export const RejectedListings = () => (
  <div><PageHeader title="Listinguri respinse" /><ListingsTable initialStatus="rejected" hideStatusFilter /></div>
);
