interface VMInfo {
  name: string;
  creator: 'contrabass' | 'client';
  status: 'active' | 'stopped' | 'error';
  container: ContainerInfo[];
}

interface ContainerInfo {
  name: string;
}

interface VMInfoWithSrc extends VMInfo {
  src: string;
}

export type { VMInfo, VMInfoWithSrc };