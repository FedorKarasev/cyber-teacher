import { createSlice } from '@reduxjs/toolkit';
import Brush from '../tools/Brush';

export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    tool: null,
  },
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setFillColor(state, action) {
      state.tool.fillColor(action.payload);
    },
    setStrokeColor(state, action) {
      state.tool.strokeColor(action.payload);
    },
    setLineWidth(state, action) {
      state.tool.lineWidth(action.payload);
    },
  },
});

export const { setTool, setFillColor, setStrokeColor, setLineWidth } = toolSlice.actions;

export default toolSlice.reducer;
