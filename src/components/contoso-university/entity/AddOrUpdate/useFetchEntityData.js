import { useEffect, useState } from 'react';

const useFetchData = (entityId, getById, initialData, initialSelectControlsData, getAllServices) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [selectControlsData, setSelectControlsData] = useState(initialSelectControlsData);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(getAllServices.map(service => service()));

        if (entityId) {
          const { data } = await getById(entityId);
          setData(data);
        }

        const [categories, owners, treatments] = responses.map(response => response.data);

        setSelectControlsData((prevState) => ({
          ...prevState,
          category: categories,
          owner: owners,
          treatment: treatments,
        }));
      } catch (error) {
        setNotification({ action: 'error', message: 'Failed to fetch data.' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [entityId, getById, getAllServices]);

  return { isLoading, data, setData, selectControlsData, notification, setNotification };
};

export default useFetchData;
