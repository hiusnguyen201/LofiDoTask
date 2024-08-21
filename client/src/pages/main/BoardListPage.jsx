import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BoardSectionList from "~/components/board/BoardSectionList";

export default function BoardListPage() {
  return (
    <Box className="px-8 py-8 h-full">
      <Typography component={"h2"} className="text-xl mb-7">
        Boards
      </Typography>

      <Box
        className="lg:flex items-center justify-between gap-x-2 pt-5"
        sx={{
          ".MuiInputBase-root": {
            width: 250,
          },
        }}
      >
        <Box className="flex items-center justify-start gap-x-2 mb-2">
          <FormControl>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              label="Sort by"
            >
              <MenuItem defaultValue={"10"}>Ten</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="flex items-center justify-start gap-x-2 mb-2">
          <FormControl>
            <TextField label="Search" type="text" />
          </FormControl>
        </Box>
      </Box>

      <BoardSectionList />
    </Box>
  );
}
