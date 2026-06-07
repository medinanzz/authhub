import { Routes, Route } from 'react-router-dom';
import { Home } from '../home';
import { Profile } from '../profile';
import { ProfileWhenCreated } from '../profile/data';

export function RouteApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profiledata" element={<Profile />} />
            <Route path="/profilewhencreated" element={<ProfileWhenCreated />} />
        </Routes>
    )
}