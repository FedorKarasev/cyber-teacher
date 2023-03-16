import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const asyncUndo = createAsyncThunk('canvas/asyncUndo', async (_, { dispatch, getState }) => {
  const state = getState().canvas;
  if (state.undoList.length) {
    const dataURL = state.undoList.pop();
    state.redoList.push(dataURL);
    const img = new Image();
    img.src = dataURL;
    await img.decode();
    dispatch(undo(img));
  }
});

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvas: null,
    undoList: [],
    redoList: [],
  },
  reducers: {
    setCanvas: (state, action) => {
      state.canvas = action.payload;
    },
    pushToUndo: (state, action) => {
      state.undoList.push(action.payload);
    },
    pushToRedo: (state, action) => {
      state.redoList.push(action.payload);
    },
    undo: (state, action) => {
      console.log('here');
      const ctx = state.canvas.getContext('2d');
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
    },
    redo: async (state) => {
      const ctx = state.canvas.getContext('2d');
      if (state.redoList.length) {
        const dataURL = state.redoList.pop();
        state.undoList.push(state.canvas.toDataURL());
        const img = new Image();
        img.src = dataURL;
        await img.decode();
        console.log(img);
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
      } else {
        console.log('Нет элементов для отката вперед');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUndo.pending, (state) => {
      // обработка начала загрузки изображения
    });
    builder.addCase(asyncUndo.fulfilled, (state) => {
      // обработка завершения загрузки изображения
    });
    builder.addCase(asyncUndo.rejected, (state) => {
      // обработка ошибки загрузки изображения
    });
  },
});

export const { setCanvas, pushToUndo, pushToRedo, undo, redo } = canvasSlice.actions;

export default canvasSlice.reducer;
