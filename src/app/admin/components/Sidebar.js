import * as React from "react";
import { styled } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import MuiLogo from "./MuiLogo";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils";
import { useRouter } from "next/navigation";

const Dropdown = styled("i")(({ theme }) => ({
  color: theme.vars.palette.text.tertiary,
}));

export default function Sidebar({ currentPath }) {
  let router = useRouter();
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: "fixed",
          md: "sticky",
        },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        // zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        zIndex: 109999,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "224px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "256px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 109998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "background.body",
          opacity: "calc(var(--SideNavigation-slideIn, 0) - 0.2)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography color="primary" fontWeight={500}>
          CSE CLUB
        </Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List
          sx={{
            "--ListItem-radius": "8px",
            "--List-gap": "4px",
            "--List-nestedInsetStart": "40px",
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin")}
              selected={currentPath === "/"}
            >
              <ListItemDecorator>
                <i data-feather="bar-chart-2" />
              </ListItemDecorator>
              <ListItemContent>Dashboard</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/events")}
              selected={currentPath === "/events"}
            >
              <ListItemDecorator>
                <i data-feather="archive" />
              </ListItemDecorator>
              <ListItemContent>Events</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/alumnies")}
              selected={currentPath === "/alumnies"}
            >
              <ListItemDecorator>
                <i data-feather="link" />
              </ListItemDecorator>
              <ListItemContent>Alumnies</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/executives")}
              selected={currentPath === "/executives"}
            >
              <ListItemDecorator>
                <i data-feather="crosshair" />
              </ListItemDecorator>
              <ListItemContent>Executives</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/blogs")}
              selected={currentPath === "/blogs"}
            >
              <ListItemDecorator>
                <i data-feather="layout" />
              </ListItemDecorator>
              <ListItemContent>Blogs</ListItemContent>
            </ListItemButton>
          </ListItem>
          {/* <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/users")}
              selected={currentPath === "/users"}
            >
              <ListItemDecorator>
                <i data-feather="users" />
              </ListItemDecorator>
              <ListItemContent>Users</ListItemContent>
            </ListItemButton>
          </ListItem> */}
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/addAlumni")}
              selected={currentPath === "/addAlumni"}
            >
              <ListItemDecorator>
                <i data-feather="user-plus" />
              </ListItemDecorator>
              <ListItemContent> Add Alumni</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/newEvent")}
              selected={currentPath === "/newEvent"}
            >
              <ListItemDecorator>
                <i data-feather="plus" />
              </ListItemDecorator>
              <ListItemContent> New Event</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => router.push("/admin/newBlog")}
              selected={currentPath === "/newBlog"}
            >
              <ListItemDecorator>
                <i data-feather="file-plus" />
              </ListItemDecorator>
              <ListItemContent> New Blog</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="sm" fontWeight="lg">
            CSE Club admin
          </Typography>
        </Box>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => {
            sessionStorage.removeItem("adminToken");
            router.replace("/admin/signin");
          }}
        >
          <i data-feather="log-out" />
        </IconButton>
      </Box>
    </Sheet>
  );
}
