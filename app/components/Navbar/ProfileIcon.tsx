import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Person2 } from "@mui/icons-material";
import AuthContext from "@/app/context/user-context";
import { useRouter } from "next/navigation";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          padding: "0",
        }}
      >
        <Person2
          sx={{
            color: "white",
            fontSize: "1.8rem",
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/orders");
            handleClose();
          }}
        >
          My Orders
        </MenuItem>
        <MenuItem onClick={() => authCtx.logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
