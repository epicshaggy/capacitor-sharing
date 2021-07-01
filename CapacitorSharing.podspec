
  Pod::Spec.new do |s|
    s.name = 'CapacitorSharing'
    s.version = '0.0.1'
    s.summary = 'Enables sharing of 1 or more resources.'
    s.license = 'MIT'
    s.homepage = 'https://github.com/epicshaggy/capacitor-sharing'
    s.author = 'Jose Martinez'
    s.source = { :git => 'https://github.com/epicshaggy/capacitor-sharing', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '12.0'
    s.dependency 'Capacitor'
  end