"use client";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../theme/ColorModeIconDropdown";
import PetrecaIcon from "../../theme/PetrecaIcon";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  // boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="regular" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PetrecaIcon />
            </Link>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="medium"
                sx={{ minWidth: 0 }}
                href="/posts"
              >
                Blog
              </Button>
              <Button href="/jogos" variant="text" color="info" size="medium">
                Jogos
              </Button>
              <Button variant="text" color="info" size="medium">
                Compra conciente
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {user ? (
              <Button
                href="/auth/logout"
                color="primary"
                variant="outlined"
                fullWidth
              >
                Logout
              </Button>
            ) : (
              <Button
                href="/auth/login"
                color="primary"
                variant="outlined"
                fullWidth
              >
                Login
              </Button>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem onClick={()=>redirect("/posts")}>Blog</MenuItem>
                <MenuItem onClick={()=>redirect("/jogos")}>Jogos</MenuItem>
                <MenuItem onClick={()=>redirect("/compra")}>Compra conciente</MenuItem>
             
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  {user ? (
                    <Button
                      href="/auth/logout"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      href="/auth/login"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Login
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
