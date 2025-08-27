import { config } from '../config'

export function getFrameworkConfig(framework = null) {
  const frameworkName = framework || config.framework
  return config.frameworks[frameworkName] || config.frameworks.shadcn
}

export function getFrameworkIcon(iconName, framework = null) {
  const frameworkConfig = getFrameworkConfig(framework)
  const iconPrefix = frameworkConfig['icon-prefix'] || ''
  
  if (iconPrefix) {
    return `${iconPrefix} ${iconName}`
  }
  
  return iconName
}

export function getFrameworkClass(className, framework = null) {
  const frameworkConfig = getFrameworkConfig(framework)
  return frameworkConfig[className] || ''
}