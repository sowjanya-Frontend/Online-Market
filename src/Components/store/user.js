import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.value += action.payload
    },
    removeUserName: (state) => {
      state.value = ""
    }
  }
})

export const { setUserName, removeUserName } = userSlice.actions

export const loggedInuserName = (state) => state.user.value

export default userSlice.reducer