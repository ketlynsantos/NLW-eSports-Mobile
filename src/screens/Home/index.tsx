import React from 'react'
import { Image, View, FlatList } from 'react-native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { GameCard } from '../../components/GameCard'

import { styles } from './styles'
import { GAMES } from '../../utils/games'

export function Home() {
    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo}/>

            <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>

            <FlatList
                contentContainerStyle={styles.contentList} 
                data={GAMES} 
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <GameCard data={item} />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
        </View>
    )
}