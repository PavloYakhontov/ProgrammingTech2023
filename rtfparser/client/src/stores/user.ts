import { defineStore } from 'pinia'
import { v4 } from 'uuid'
import type { User } from '@/core/types/User'
import axios, { type AxiosResponse } from 'axios'
import {BASE_URI, AUTHORIZE_PATH, REGISTER_PATH} from '../core/constants.ts'


export const userStore = defineStore('user', {
  state: () => ({ uuid: v4(), username: ''} as User),
  getters: {
    getUUID: (state) => state.uuid,
    getUser: (state) => state.username
  },
  actions: {
    setUser(username: string) {
      this.username = username
    },
    async loginUser(user: {username: string, password: string}): Promise<AxiosResponse> {
      try {
        const response = await axios.post(`${AUTHORIZE_PATH}`, {
          username: user.username,
          password: user.password,
        });
        this.setUser(user.username);
        return response;
      } catch (err: any) {
        throw err
      }
    },
    async registerUser(user: {username: string, password: string}): Promise<AxiosResponse> {
      try {
        const response = await axios.post(`${REGISTER_PATH}`, {
          username: user.username,
          password: user.password,
        });
        return response;
      } catch(err: any) {
        console.log(err)
        throw new Error(err.response.data.message);
      }
    }
  }
})
