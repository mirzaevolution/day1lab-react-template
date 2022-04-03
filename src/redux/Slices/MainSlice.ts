import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GuestModel } from '../../models'
import { getUser } from '../../services'

export const getUsers = createAsyncThunk('users/fetch', async () => {
    return await getUser();
}
)

interface MainState {
    formData: GuestModel[],
    userData: GuestModel[],
    isLoading: Boolean
}

const initialState: MainState = {
    formData: [],
    userData: [],
    isLoading: false
}

export const MainSlice = createSlice({
    name: 'MainSlice',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<GuestModel>) => {
            return { ...state, formData: [...state.formData, action.payload] }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            const data = action.payload.data;
            let datas: GuestModel[] = [];
            data.forEach((element: any) => {
                datas.push({
                    firstName: element?.name,
                    lastName: element?.username,
                    address: element?.address?.city
                })
            });
            state.userData = datas;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const { setFormData } = MainSlice.actions

export default MainSlice.reducer