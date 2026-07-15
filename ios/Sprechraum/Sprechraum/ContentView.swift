import AVFoundation
import SwiftUI
import WebKit

struct ContentView: View {
    @State private var isLoading = true
    @State private var loadFailed = false

    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()

            SprechraumWebView(isLoading: $isLoading, loadFailed: $loadFailed)
                .ignoresSafeArea(.container, edges: .bottom)

            if isLoading {
                LaunchCard()
                    .transition(.opacity)
            }

            if loadFailed {
                ConnectionCard()
            }
        }
        .animation(.easeOut(duration: 0.25), value: isLoading)
    }
}

private struct LaunchCard: View {
    var body: some View {
        VStack(spacing: 18) {
            Text("S")
                .font(.system(size: 42, weight: .black, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 82, height: 82)
                .background(Color(red: 0.35, green: 0.80, blue: 0.01))
                .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
                .shadow(color: Color.black.opacity(0.12), radius: 0, y: 6)

            VStack(spacing: 5) {
                Text("Sprechraum")
                    .font(.system(size: 29, weight: .black, design: .rounded))
                    .foregroundStyle(Color(red: 0.15, green: 0.19, blue: 0.28))
                Text("DEUTSCH. SICHER.")
                    .font(.system(size: 10, weight: .bold, design: .rounded))
                    .tracking(3)
                    .foregroundStyle(.secondary)
            }

            ProgressView()
                .tint(Color(red: 0.11, green: 0.69, blue: 0.96))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
    }
}

private struct ConnectionCard: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "wifi.exclamationmark")
                .font(.system(size: 30, weight: .bold))
                .foregroundStyle(.orange)
            Text("Sprechraum sunucusuna bağlanılamadı")
                .font(.system(size: 17, weight: .bold, design: .rounded))
            Text("Mac'te yerel sunucunun 4173 portunda çalıştığından emin olun ve uygulamayı yeniden başlatın.")
                .font(.system(size: 13, design: .rounded))
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
        .frame(maxWidth: 330)
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
        .shadow(color: .black.opacity(0.15), radius: 28, y: 12)
        .padding()
    }
}

private struct SprechraumWebView: UIViewRepresentable {
    @Binding var isLoading: Bool
    @Binding var loadFailed: Bool

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.isOpaque = false
        webView.backgroundColor = .white
        webView.scrollView.backgroundColor = .white
        webView.scrollView.contentInsetAdjustmentBehavior = .never

        if let url = URL(string: "http://127.0.0.1:4173/?v=34&native=ios") {
            webView.load(URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData))
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        private let parent: SprechraumWebView

        init(parent: SprechraumWebView) {
            self.parent = parent
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            parent.isLoading = false
            parent.loadFailed = false
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.loadFailed = true
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.loadFailed = true
        }

        @available(iOS 15.0, *)
        func webView(
            _ webView: WKWebView,
            requestMediaCapturePermissionFor origin: WKSecurityOrigin,
            initiatedByFrame frame: WKFrameInfo,
            type: WKMediaCaptureType,
            decisionHandler: @escaping (WKPermissionDecision) -> Void
        ) {
            guard type == .microphone || type == .cameraAndMicrophone else {
                decisionHandler(.deny)
                return
            }

            AVCaptureDevice.requestAccess(for: .audio) { allowed in
                DispatchQueue.main.async {
                    decisionHandler(allowed ? .grant : .deny)
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
