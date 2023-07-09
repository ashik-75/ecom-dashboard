import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";

function Profile() {
  return (
    <div>
      <Button variant={"ghost"} size={"sm"}>
        <UserCircle className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Profile;
