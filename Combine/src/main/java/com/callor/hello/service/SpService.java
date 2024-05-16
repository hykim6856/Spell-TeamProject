package com.callor.hello.service;

import java.util.ArrayList;
import java.util.List;

import org.openkoreantext.processor.KoreanPosJava;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken;
import org.openkoreantext.processor.tokenizer.TokenizerProfile;
import org.springframework.stereotype.Service;

import scala.collection.Seq;

@Service
public class SpService {

    public List<String> extractNouns(String text) {
        List<String> nouns = new ArrayList<>();
        Seq<KoreanToken> tokens = KoreanTokenizer.tokenize(text, TokenizerProfile.defaultProfile());

        for (KoreanToken token : scala.collection.JavaConversions.seqAsJavaList(tokens)) {
            KoreanPosJava pos = KoreanPosJava.valueOf(token.pos().toString());

            if (pos.equals(KoreanPosJava.Noun) || pos.equals(KoreanPosJava.ProperNoun)) {
                String noun = token.text();
                if (!nouns.contains(noun)) { // 이미 존재하는 명사인지를 확인하여 중복을 방지합니다.
                    nouns.add(noun);
                }
            }
        }

        return nouns;
    }
}
