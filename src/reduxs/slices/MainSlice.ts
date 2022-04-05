import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';
import { GuestModel, UserModel } from '../../models'
import { getUser } from '../../services'

export const getUsers = createAsyncThunk('users/fetch', async () => {
    return await getUser();
}
)

interface MainState {
    formData: GuestModel[],
    userData: GuestModel[],
    currentUser: UserModel | null,
    isLoading: Boolean
}

const initialState: MainState = {
    formData: [],
    userData: [],
    isLoading: false,
    currentUser:null
}

export const MainSlice = createSlice({
    name: 'MainSlice',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<GuestModel>) => {
            return { ...state, formData: [...state.formData, action.payload] }
        },
        setCurrentUser: (state, action: PayloadAction<string>) => {
            const decode:any = jwtDecode(action.payload)
            const user:UserModel = {
                name : decode?.name,
                role :decode?.role,
                email :decode?.email
            }
            return { ...state, currentUser: user }
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

export const { setFormData,setCurrentUser } = MainSlice.actions

export default MainSlice.reducer
