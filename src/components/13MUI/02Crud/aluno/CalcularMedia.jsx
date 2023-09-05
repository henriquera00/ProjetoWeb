import { useEffect, useState } from 'react';
import { client, dbName } from '../../../../../crud_express/services/aluno.service.mongo';

const useCalcularMedia = () => {
  const [mediaIRA, setMediaIRA] = useState(null);

  useEffect(() => {
    const calcularMedia = async () => {
      const db = client.db(dbName);
      const collection = db.collection('alunos');

      try {
        const result = await collection.aggregate([
          {
            $group: {
              _id: null,
              media: { $avg: '$ira' },
            },
          },
        ]).toArray();

        if (result.length > 0) {
          setMediaIRA(result[0].media);
        } else {
          setMediaIRA(null);
        }
      } catch (error) {
        console.error('Erro ao calcular a média', error);
        setMediaIRA(null);
      }
    };

    calcularMedia();
  }, []);

  return mediaIRA;
};

export default useCalcularMedia;