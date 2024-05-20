import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { UserTypeSelection } from './src/screens/UserTypeSelection';
import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { app } from './firebaseconfig';
import { Login } from './src/screens/Login';
import AgencyUsers from './src/screens/AgencyUsers';

// Inicializar o contexto
const UserContext = createContext<{ user: any | null; userTypeSelected: boolean; userType: string | null } | undefined>(undefined);

// Componente pai que envolve todos os componentes dependentes
function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userTypeSelected, setUserTypeSelected] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isSpecificUser, setIsSpecificUser] = useState(false);
  const db = getFirestore(app); // Initialize Firestore

  useEffect(() => {
    const checkUserTypeSelection = async () => {
      try {
        if (user) {
          const email = user.primaryEmailAddress.emailAddress;

          // Verifica se o email é agenciacomex05@gmail.com
          if (email === 'agenciacomex05@gmail.com') {
            setIsSpecificUser(true);
          } else {
            const userInfoRef = collection(db, 'userInfo');
            const q = query(userInfoRef, where('emailUser', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              setUserTypeSelected(true);
              setUserType(userData.tipo); // Armazena o tipo de usuário
            }
          }
        }
      } catch (error) {
        console.error('Erro ao verificar seleção do tipo de usuário:', error);
      }
    };

    checkUserTypeSelection();
  }, [user, db]);

  // Forneça o contexto
  return (
    <UserContext.Provider value={{ user, userTypeSelected, userType, isSpecificUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Componente App que envolve todos os componentes dependentes do contexto
export default function App() {
  return (
    <ClerkProvider frontendApi="pk_test_ZmluZXItcGVuZ3Vpbi0xNS5jbGVyay5hY2NvdW50cy5kZXYk">
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ClerkProvider>
  );
}

function AppContent() {
  const { user, userTypeSelected, userType, isSpecificUser } = useContext(UserContext) || { user: null, userTypeSelected: false, userType: null, isSpecificUser: false };

  useEffect(() => {
    console.log("User from context:", user);
    console.log("User type selected from context:", userTypeSelected);
    console.log("User type from context:", userType);
    console.log("Is specific user from context:", isSpecificUser);
  }, [user, userTypeSelected, userType, isSpecificUser]);

  // Verifica se o usuário está autenticado e se o tipo de usuário foi selecionado
  if (user === null) {
    // Se o usuário não estiver autenticado, exibe a tela de login
    return (
      <NavigationContainer>
        <SignedOut>
          <Login/>
        </SignedOut>
      </NavigationContainer>
    );
  } else if (isSpecificUser) {
    // Se o email do usuário for agenciacomex05@gmail.com, exibe a tela correspondente aos usuários da agência
    return (
      <SignedIn>
        <AgencyUsers />
      </SignedIn>
    );
  } else if (!userTypeSelected) {
    // Se o tipo de usuário não foi selecionado, exibe a tela de seleção de tipo de usuário
    return (
      <NavigationContainer>
        <SignedIn>
          <UserTypeSelection />
        </SignedIn>
      </NavigationContainer>
    );
  } else if (isSpecificUser) {
    // Se o tipo de usuário selecionado for "agencia", exibe a tela correspondente aos usuários da agência
    return (
      <SignedIn>
        <AgencyUsers />
      </SignedIn>
    );
  } else {
    // Se o tipo de usuário selecionado for outro, exibe as rotas do aplicativo padrão
    return (
      <NavigationContainer>
        <SignedIn>
          <AppRoutes />
        </SignedIn>
      </NavigationContainer>
    );
  }
}
