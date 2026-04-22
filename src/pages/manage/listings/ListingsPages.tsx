import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ListingsTable from "@/components/manage/ListingsTable";
import { Button } from "@/components/ui/button";

export const AllListings = () => (
  <div>
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Listings Management</h1>
        <p className="text-sm text-muted-foreground">Toate companiile listate pe platformă</p>
      </div>
      <Button asChild>
        <Link to="/manage/listings/new/edit">
          <Plus size={16} />
          Adaugă Listing
        </Link>
      </Button>
    </div>
    <ListingsTable />
  </div>
);
