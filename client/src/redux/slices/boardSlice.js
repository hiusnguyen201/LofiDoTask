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

const boardSlice = createSlice({
  name: "board",
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

const { actions, reducer } = boardSlice;

export default reducer;

export const getAllBoard = (filter) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getAllBoard(filter);
    dispatch(actions.getAll(data.data.boards));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const createBoard = (name) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createBoard({ name });
    dispatch(actions.create(data.data.board));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const updateBoard = (id, name) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateBoard(id, { name });
    dispatch(actions.update(data.data.board));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteBoard(id);
    dispatch(actions.delete({ _id: id }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};

export const toggleStarBoard = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.toggleStarBoard(id);
    dispatch(actions.update(data.data.board));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
    displayOverlayError(e?.response?.data?.message || "Error");
  }
};
