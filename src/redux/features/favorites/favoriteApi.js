import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/favorites`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Favorites'],
    endpoints: (builder) => ({
        addFavorite: builder.mutation({
            query: (data) => ({
                url: '/add-favorite',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Favorites'],
        }),
        removeFavorite: builder.mutation({
            query: (data) => ({
                url: '/remove-favorite',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Favorites'],
        }),
        getFavoritesByEmail: builder.query({
            query: (email) => `/${email}`,
            providesTags: ['Favorites'],
        }),
    }),
});

export const { useAddFavoriteMutation, useRemoveFavoriteMutation, useGetFavoritesByEmailQuery } = favoriteApi;
