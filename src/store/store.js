import { configureStore } from '@reduxjs/toolkit';
import canvasSlice from './canvasSlice';
import toolSlice from './toolSlice';

export default configureStore({
  reducer: {
    canvas: canvasSlice,
    tool: toolSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
