import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { visuallyHidden } from "@mui/utils";
import {
  Avatar,
  FormControl,
  FormLabel,
  IconButton,
  Link,
  Option,
  Select,
} from "@mui/joy";
import { getComparator, stableSort } from "../utils/stabalizedSort";
import { useRouter } from "next/navigation";
import ConfirmationPopup from "./ConfirmationPopup";
import { deleteAlumni } from "../actions/alumniActions";
import DeleteItem from "./DeleteItem";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th style={{ width: "var(--Table-firstColumnWidth)" }}>Name</th>
        <th style={{ width: 200 }}>Photo</th>
        <th
          aria-sort={
            orderBy === "session"
              ? { asc: "ascending", desc: "descending" }[order]
              : undefined
          }
          style={{ width: 200 }}
        >
          <Link
            underline="none"
            color="neutral"
            textColor={orderBy === "session" ? "primary.plainColor" : undefined}
            component="button"
            onClick={createSortHandler("session")}
            fontWeight="lg"
            startDecorator={<i data-feather="bar-chart-2" />}
            endDecorator={<i data-feather="eye" />}
            sx={{
              "& svg": {
                transition: "0.2s",
                transform:
                  orderBy === "session" && order === "desc"
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
              },
              "&:hover": { "& svg": { opacity: 1 } },
            }}
          >
            Session
            {orderBy === "session" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </Link>
        </th>

        <th style={{ width: 200 }}>Email</th>
        <th
          aria-sort={
            orderBy === "createdDate"
              ? { asc: "ascending", desc: "descending" }[order]
              : undefined
          }
          style={{ width: 200 }}
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            underline="none"
            color="neutral"
            textColor={
              orderBy === "createdDate" ? "primary.plainColor" : undefined
            }
            component="button"
            onClick={createSortHandler("createdDate")}
            fontWeight="lg"
            startDecorator={<i data-feather="bar-chart-2" />}
            endDecorator={<i data-feather="eye" />}
            sx={{
              "& svg": {
                transition: "0.2s",
                transform:
                  orderBy === "createdDate" && order === "desc"
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
              },
              "&:hover": { "& svg": { opacity: 1 } },
            }}
          >
            Created At
            {orderBy === "createdDate" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </Link>
        </th>
        <th aria-label="last" style={{ width: "var(--Table-lastColumnWidth)" }}>
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default function AlumniDataTable({
  rows = [],
  alumnies,
  setRows = () => {},
  setAlumnies,
  resetPage,
}) {
  let router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdDate");
  let afterProcessed = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // the page is empty so reset it
  if (!afterProcessed.length && rows.length) setPage(0);
  if (resetPage) setPage(0);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    stableSort(rows, getComparator(order, orderBy));
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };
  const handleDelete = async (id, name) => {
    // preserving the state before deleting for rows
    let befDelete = [...rows];
    let afterDelete = rows.filter((r) => r._id !== id);
    // to maintain update the parent alumnies
    let befDeleteAlumnies = [...alumnies];
    let afterDeleteAlumnies = alumnies.filter((r) => r._id !== id);
    setRows(afterDelete);
    setAlumnies(afterDeleteAlumnies);
    try {
      setShowPopup(false);
      // await async "fetchBooks()" function
      const data = await deleteAlumni(id);
      if (data?.success) {
        // removing the preserving state
        befDelete.length = 0;
        befDeleteAlumnies.length = 0;
        toast.success(name + " is deleted successfully !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      setRows(() => [...befDelete]);
      setAlumnies(() => [...befDeleteAlumnies]);
      toast.error("Failed : " + err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box sx={{ width: "100%" }}>
      <Typography level="body2" textAlign="center" sx={{ pb: 2 }}>
        ← Scroll direction →
      </Typography>
      <Sheet
        variant="outlined"
        sx={{
          "--TableCell-height": "40px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "130px",
          "--Table-lastColumnWidth": "144px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            "& tr > *:first-child": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
            p: 2,
          }}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {/* <thead>
            <tr>
              <th style={{ width: "var(--Table-firstColumnWidth)" }}>Row</th>
              <th style={{ width: 200 }}>Calories</th>
              <th style={{ width: 200 }}>Fat&nbsp;(g)</th>
              <th style={{ width: 200 }}>Carbs&nbsp;(g)</th>
              <th style={{ width: 200 }}>Protein&nbsp;(g)</th>
              <th
                aria-label="last"
                style={{ width: "var(--Table-lastColumnWidth)" }}
              />
            </tr>
          </thead> */}
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: 5,

                    width: "100%",
                  }}
                >
                  Nothing to show !
                </td>
              </tr>
            )}
            {rows &&
              afterProcessed.map((row, idx) => {
                return (
                  <tr key={row._id}>
                    <td style={{ zIndex: 5 }}>{idx + 1 + ".   " + row.name}</td>

                    <td>
                      <Avatar src={row.photo} />
                    </td>

                    <td>{row.session}</td>
                    <td>{row.email}</td>
                    <td>{new Date(row.createdDate).toLocaleDateString()}</td>
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          onClick={() => {
                            router.push("/admin/updateAlumni/" + row._id);
                          }}
                          size="sm"
                          variant="plain"
                          color="neutral"
                        >
                          Edit
                        </Button>

                        <DeleteItem
                          action={() => handleDelete(row._id, row.name)}
                        />
                      </Box>
                    </td>
                  </tr>
                );
              })}
            {emptyRows > 0 && (
              <tr
                style={{
                  height: `calc(${emptyRows} * 40px)`,
                  "--TableRow-hoverBackground": "transparent",
                }}
              >
                <td colSpan={6} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel>Rows per page:</FormLabel>
                    <Select
                      onChange={handleChangeRowsPerPage}
                      value={rowsPerPage}
                    >
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
                  <Typography textAlign="center" sx={{ minWidth: 80 }}>
                    {labelDisplayedRows({
                      from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: rows.length === -1 ? -1 : rows.length,
                    })}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <i data-feather="arrow-left" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={
                        rows.length !== -1
                          ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <i data-feather="arrow-right" />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Sheet>
    </Box>
  );
}
