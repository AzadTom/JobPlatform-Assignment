import React from 'react';

import styles from './jobcard.module.css';

function JobCard(props) {

  const {logoUrl,jobRole,companyName,location,jobDetailsFromCompany,minExp=0,jdLink} = props;  


  return (
    <div className={styles.card}>
     <div className={styles.cardHeader}>
       <div className={styles.logoContainer}>
        <img src={logoUrl}  alt="logo" />
        </div> 
        <div className={styles.cardHeaderContent}>
            <h2>{companyName}</h2>
            <span className={styles.jobRole}>{jobRole}</span>
            <span className={styles.location}>{location}</span>
        </div>
    </div> 

    <div className={styles.jobDescription}>
        <h3 className={styles.descriptionTitle}>Job description</h3>
        <p className={styles.description}>{jobDetailsFromCompany.substring(0,255)}...</p>
        <p className={styles.topShadow}></p>
        <p className={styles.showMore}>Show more</p>
        
    </div>  

    <div  className={styles.experienceContainer}>
        <p>Minimum Experience</p>
        <span className={styles.experience}> <span>{minExp}</span> <span>Years</span></span>
    </div>
     <button className={styles.easyApply}><a href={jdLink}>Easy Apply</a></button>
    </div>
  )
}

export default React.memo(JobCard);