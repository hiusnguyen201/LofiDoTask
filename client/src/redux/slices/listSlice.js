import { createSlice } from "@reduxjs/toolkit";
import * as api from "~/api";
import { displayOverlayError } from "~/utils/toast";

const initialState = {
  isLoading: true,
  error: null,
  deletedIds: [],
  item: null,
  list: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getAll(state, action) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getOne(state, action) {
      state.item = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    create(state, action) {
      state.list.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    update(state, action) {
      state.list = state.list.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
    },
    delete(state, action) {
      state.list = state.list.filter(
        (item) => item._id !== action.payload._id
      );
      state.deletedIds.push(action.payload._id);
      state.isLoading = false;
      state.error = null;
    },
  },
});

const { actions, reducer } = listSlice;

export default reducer;

export const getAllListInBoard = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getAllListInBoard(id);
    dispatch(actions.getAll(data.data.lists));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const createList = (boardId, name) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createList({ name, board: boardId });
    dispatch(actions.create(data.data.list));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const updateList = (id, name) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateList(id, { name });
    dispatch(actions.update(data.data.list));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteList(id);
    dispatch(actions.delete({ _id: id }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};
