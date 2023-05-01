
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  createNewUser: (username: string) => ipcRenderer.send('create-new-user', username)
})

