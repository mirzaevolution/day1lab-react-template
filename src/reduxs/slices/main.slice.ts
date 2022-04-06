import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';
import { GuestModel, UserModel } from '../../models'
interface MainState {
    formData: GuestModel[],
    currentUser: UserModel | null,
    isLoading: Boolean
}

const initialState: MainState = {
    formData: [],
    isLoading: false,
    currentUser: null
}

export const MainSlice = createSlice({
    name: 'MainSlice',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<GuestModel>) => {
            return { ...state, formData: [...state.formData, action.payload] }
        },
        setCurrentUser: (state, action: PayloadAction<string>) => {
            const decode: any = jwtDecode(action.payload)
            const user: UserModel = {
                name: decode?.name,
                role: decode?.role,
                email: decode?.email
            }
            return { ...state, currentUser: user }
        }
    },
    extraReducers: (builder) => {
    }
})

export const { setFormData, setCurrentUser } = MainSlice.actions

export default MainSlice.reducer
