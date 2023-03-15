import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    undo: async (state) => {
      const ctx = state.canvas.getContext('2d');
      if (state.undoList.length) {
        const dataURL = state.undoList.pop();
        state.redoList.push(dataURL);
        const img = new Image();
        img.src = dataURL;
        await img.decode();
        console.log(img);
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
      } else {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        console.log('Нет элементов для отката');
      }
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
});

export const { setCanvas, pushToUndo, pushToRedo, undo, redo } = canvasSlice.actions;

export default canvasSlice.reducer;
