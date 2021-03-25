import React, { useState, useEffect } from 'react';
import Table from '../Table';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const ListView = ({ columns, endpoint, fetchCount }) => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setRows(response.data.data);
    } catch (error) {
      toast.info('Erro inesperado');
    }

  };

  useEffect(() => {
    fetchData();
  }, [fetchCount]);

  return <Table columns={columns} rows={rows} />;
};

export default ListView;
