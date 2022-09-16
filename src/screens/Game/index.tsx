import { useState, useEffect } from 'react'
import { 
    FlatList, 
    Image, 
    TouchableOpacity, 
    View, 
    Text 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles'
import { THEME } from '../../theme'

import { GameParams } from '../../@types/navigation'
import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'

export function Game() {
    
    const navigation = useNavigation()
    //Resgatar as informações que vem da rota
    const route = useRoute()
    const game = route.params as GameParams
    // console.log(game)

    const [ duos, setDuos ] = useState<DuoCardProps[]>([])

    //Navegação para a tela inicial
    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(()=> {
        fetch(`http://192.168.15.109:3333/games/${game.id}/ads`)
        .then(response => response.json())
        .then(data => setDuos(data))
    }, [])

    return(
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo  name="chevron-thin-left"  color={THEME.COLORS.CAPTION_300}  size={20}/>
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} resizeMode="cover"/>
                    
                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} />
                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>

                <FlatList  
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => {}}/>
                    )}
                    horizontal
                    style={ styles.containerList }
                    contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                />
            </SafeAreaView>
        </Background>
    )
}