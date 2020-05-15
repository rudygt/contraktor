import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/ProjectService';
import { Project, Contract } from '../types';
import { ContractListItem } from '../components/ContractListItem';

export const ProjectPage = () => {
  const { name } = useParams();
  const [project, setProject] = useState<Project | undefined>(undefined);

  const fetchProject = async () => { 
    const project = await getProject(name);
    if (project) { 
      console.log(project);
      setProject(project);
    }
  }

  useEffect(() => {
    fetchProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const contractListItems = project?.contracts.map((contract: Contract) =>
    <ContractListItem key={contract.name} contract={contract} />
  );

  if (!project) { 
    return (
      <>
      <div>
        <Header />
      </div>
      <div>
        <p>Project not found..</p>
      </div>
      </>
    );  
  } 

  return (
    <>
    <div>
      <Header />
    </div>
    <div>
      <h2>{project.name}</h2>
      
      <h3>Contracts</h3>
      <ul>
        {contractListItems}
      </ul>
    </div>
    </>
  );  
}