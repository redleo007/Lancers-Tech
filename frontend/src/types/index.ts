export type Project = {
id: string
name: string
description?: string
}


export type TaskStatus = 'todo' | 'inprogress' | 'done'


export type Task = {
id: string
title: string
description?: string
status: TaskStatus
projectId?: string
}


export type Sprint = {
id: string
name: string
startDate?: string
endDate?: string
tasks?: string[]
}


export type User = {
id: string
name: string
email: string
}