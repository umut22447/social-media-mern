import React from 'react';
import Header from '../Header/Header';
import AccountEdit from './AccountEdit';
import './style.css';

export default function AccountsMain() {
    return (
        <div>
            <Header />
            <div className="accounts-root">
                <div className="accounts-main mt-3">
                    <AccountEdit />
                </div>
            </div>
        </div>
    )
}
