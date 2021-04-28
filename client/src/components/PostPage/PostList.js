import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function PostList() {
    const { signOut } = useAuth();

    return (
        <div>
            Main
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}
