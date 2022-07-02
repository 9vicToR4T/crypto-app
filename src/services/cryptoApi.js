import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY_COINRANKING,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

// rapidAPi coinranking

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoHeaders });

const req = (url, params) => ({
  url,
  headers: cryptoHeaders,
  params: { timePeriod: params },
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoinDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        req(`/coin/${coinId}/history`, timePeriod),
    }),
    getCoinMarkets: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}/markets`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
  useGetCoinMarketsQuery,
} = cryptoApi;
