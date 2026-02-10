import React, { useEffect } from 'react';
import CompanySection from '../components/CompanySection';
import MasterPlanSection from '../components/MasterPlanSection';

export default function Company() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <CompanySection />
            <MasterPlanSection />
        </div>
    );
}
