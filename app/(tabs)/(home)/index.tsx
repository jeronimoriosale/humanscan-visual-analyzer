import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Scan, Eye, AlertTriangle, Shield, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  const handleScan = (type: 'skin' | 'ocular') => {
    console.log('[HomeScreen] Starting scan:', type);
    router.push({ pathname: '/scan', params: { type } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top }]}>
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroIconContainer}>
            <Shield color={Colors.textInverse} size={40} />
          </View>
          <Text style={styles.heroTitle}>Análisis Visual de Salud</Text>
          <Text style={styles.heroSubtitle}>
            Herramienta de triaje digital para detección preliminar
          </Text>
        </LinearGradient>
      </View>

      <View style={styles.scanSection}>
        <Text style={styles.sectionTitle}>Iniciar Escaneo</Text>
        <Text style={styles.sectionSubtitle}>
          Selecciona el tipo de análisis que deseas realizar
        </Text>

        <TouchableOpacity
          style={styles.scanCard}
          onPress={() => handleScan('skin')}
          activeOpacity={0.8}
          testID="skin-scan-button"
        >
          <LinearGradient
            colors={[Colors.skinScanBg, '#F5F3FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scanCardGradient}
          >
            <View style={styles.scanCardContent}>
              <View style={[styles.scanIconContainer, { backgroundColor: Colors.skinScan }]}>
                <Scan color={Colors.textInverse} size={28} />
              </View>
              <View style={styles.scanTextContainer}>
                <Text style={styles.scanCardTitle}>Análisis Dermatológico</Text>
                <Text style={styles.scanCardDescription}>
                  Evaluación de piel, lunares, manchas y lesiones cutáneas
                </Text>
                <View style={styles.scanCardFeatures}>
                  <Text style={styles.featureTag}>ABCDE</Text>
                  <Text style={styles.featureTag}>Triaje</Text>
                  <Text style={styles.featureTag}>Guía</Text>
                </View>
              </View>
              <ChevronRight color={Colors.skinScan} size={24} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanCard}
          onPress={() => handleScan('ocular')}
          activeOpacity={0.8}
          testID="eye-scan-button"
        >
          <LinearGradient
            colors={[Colors.eyeScanBg, '#F0F9FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scanCardGradient}
          >
            <View style={styles.scanCardContent}>
              <View style={[styles.scanIconContainer, { backgroundColor: Colors.eyeScan }]}>
                <Eye color={Colors.textInverse} size={28} />
              </View>
              <View style={styles.scanTextContainer}>
                <Text style={styles.scanCardTitle}>Análisis Ocular</Text>
                <Text style={styles.scanCardDescription}>
                  Evaluación visual de conjuntiva, esclerótica e iris
                </Text>
                <View style={styles.scanCardFeatures}>
                  <Text style={styles.featureTag}>Conjuntiva</Text>
                  <Text style={styles.featureTag}>Pupila</Text>
                  <Text style={styles.featureTag}>Iris</Text>
                </View>
              </View>
              <ChevronRight color={Colors.eyeScan} size={24} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimerSection}>
        <View style={styles.disclaimerCard}>
          <AlertTriangle color={Colors.warning} size={20} />
          <Text style={styles.disclaimerText}>
            Esta herramienta es solo informativa y no reemplaza la consulta médica profesional.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  heroGradient: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  heroIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.textInverse,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
  },
  scanSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  scanCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  scanCardGradient: {
    padding: 20,
  },
  scanCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  scanCardTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  scanCardDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  scanCardFeatures: {
    flexDirection: 'row',
    gap: 8,
  },
  featureTag: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: Colors.textMuted,
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  disclaimerSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.warningBg,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
});
